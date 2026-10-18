#!/usr/bin/env bash
set -euo pipefail

: "${WGN_CANDIDATE_SHA:?Set the exact 40-character candidate SHA}"
: "${WGN_STAGING_HOST:?Set the verified staging host name}"
: "${WGN_STAGING_USER:?Set the approved deployment user}"
: "${WGN_STAGING_HOST_KEY:?Set the verified known_hosts line out of band}"
: "${WGN_STAGING_ENV_FILE:?Set the path to the reviewed fixture-only environment file}"
: "${WGN_DEPLOY_SCRATCH_ROOT:?Set a workspace-owned scratch directory}"
: "${WGN_REMOTE_APP_ROOT:?Set the isolated remote app root}"

if [[ ! "$WGN_CANDIDATE_SHA" =~ ^[0-9a-f]{40}$ ]]; then
	echo "Candidate SHA must be exactly 40 lowercase hexadecimal characters" >&2
	exit 2
fi

if [[ "$WGN_REMOTE_APP_ROOT" != */ai-tools-night-website-staging ]]; then
	echo "Remote root must end with /ai-tools-night-website-staging" >&2
	exit 2
fi

if [[ "$WGN_DEPLOY_SCRATCH_ROOT" == /tmp* || "$WGN_DEPLOY_SCRATCH_ROOT" == / ]]; then
	echo "Scratch root must be a scoped workspace directory" >&2
	exit 2
fi

git cat-file -e "${WGN_CANDIDATE_SHA}^{commit}"
mkdir -p "$WGN_DEPLOY_SCRATCH_ROOT"
deploy_scratch="$(mktemp -d "${WGN_DEPLOY_SCRATCH_ROOT%/}/wgn-stage.XXXXXX")"
known_hosts_file="$deploy_scratch/known_hosts"
candidate_archive="$deploy_scratch/${WGN_CANDIDATE_SHA}.tar"

cleanup() {
	if [[ -d "$deploy_scratch" ]]; then
		find "$deploy_scratch" -type f -delete
		find "$deploy_scratch" -depth -type d -empty -delete
	fi
}
trap cleanup EXIT

printf '%s\n' "$WGN_STAGING_HOST_KEY" > "$known_hosts_file"
chmod 600 "$known_hosts_file"
ssh_options=(-o BatchMode=yes -o StrictHostKeyChecking=yes -o "UserKnownHostsFile=$known_hosts_file")
remote="${WGN_STAGING_USER}@${WGN_STAGING_HOST}"
release_path="${WGN_REMOTE_APP_ROOT}/releases/${WGN_CANDIDATE_SHA}"

git archive --format=tar "$WGN_CANDIDATE_SHA" > "$candidate_archive"

ssh "${ssh_options[@]}" "$remote" \
	"test ! -e '$release_path' && ! ss -ltnH | awk '{print \$4}' | grep -Eq '(^|:)4175$' && mkdir -p '$release_path' '${WGN_REMOTE_APP_ROOT}/shared'"

scp "${ssh_options[@]}" "$candidate_archive" "$remote:$release_path/source.tar"
scp "${ssh_options[@]}" "$WGN_STAGING_ENV_FILE" "$remote:${WGN_REMOTE_APP_ROOT}/shared/wgn-staging.env"

ssh "${ssh_options[@]}" "$remote" "bash -se -- '$release_path' '$WGN_REMOTE_APP_ROOT' '$WGN_CANDIDATE_SHA'" <<'REMOTE'
set -euo pipefail
release_path="$1"
remote_app_root="$2"
candidate_sha="$3"
cd "$release_path"
tar -xf source.tar
bun install --frozen-lockfile
bun run lint
bun run check
WGN_ENV=testing bun run test
WGN_ENV=staging WGN_FORMS_MODE=fixture WGN_CHAT_MODE=fixture bun run build:local
ln -sfn "$release_path" "$remote_app_root/current"
set -a
. "$remote_app_root/shared/wgn-staging.env"
set +a
export WGN_RELEASE_SHA="$candidate_sha"
cd "$remote_app_root/current"
pm2 start build/index.js --name ai-tools-night-website-staging --interpreter bun --time
health_payload="$(curl --fail --silent --show-error http://127.0.0.1:4175/healthz)"
if [[ "$health_payload" != *"\"releaseSha\":\"$candidate_sha\""* ]]; then
	echo "Health response did not confirm the reviewed release SHA" >&2
	exit 1
fi
printf '%s\n' "$health_payload"
REMOTE

echo "Staging process started from exact SHA $WGN_CANDIDATE_SHA on verified loopback port 4175."
