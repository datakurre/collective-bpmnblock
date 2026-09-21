{ config, lib, pkgs, ... }:
{
  languages.python.enable = true;
  languages.python.uv.enable = true;
  languages.javascript.enable = true;
  languages.javascript.npm.enable = true;
  languages.javascript.pnpm.enable = true;

  ## Tweaks

  # NixOS: PyPI ruff wheel fails (exit 127) without nix-ld, so use Nix's ruff
  # and shim `uvx ruff` (called by cookieplone) to it.
  packages = [ pkgs.ruff ];

  scripts.uvx.exec = ''
    if [ "$1" = ruff ]; then shift; exec ${pkgs.ruff}/bin/ruff "$@"; fi
    exec ${pkgs.uv}/bin/uvx "$@"
  '';

  # Local cache prevents conflicts with other projects
  env.UV_CACHE_DIR = "${config.devenv.root}/.devenv/state/uv-cache";
  env.UV_NO_CONFIG = "1";
  env.UV_TOOL_DIR = "${config.devenv.root}/.devenv/state/uv-tools";

  # The project Makefile expects its venv in backend/.venv.
  env.UV_PROJECT_ENVIRONMENT = lib.mkForce "${config.devenv.root}/backend/.venv";
  env.HATCH_DATA_DIR = "${config.devenv.root}/.devenv/state/hatch";

  # NixOS: lightningcss-cli's npm postinstall copies a prebuilt generic-Linux
  # binary that cannot run without nix-ld. Shim pnpm so that after every
  # invocation (notably `pnpm install`, before the build steps that follow it)
  # the copy is replaced by a symlink to Nix's build. Only the directory entry
  # changes; the pnpm store copy is untouched.
  scripts.pnpm.exec = ''
    ${config.languages.javascript.pnpm.package}/bin/pnpm "$@"
    rc=$?
    for bin in "${config.devenv.root}"/frontend/node_modules/.pnpm/lightningcss-cli@*/node_modules/lightningcss-cli/lightningcss; do
      if [ -e "$bin" ] || [ -L "$bin" ]; then ln -sf ${pkgs.lightningcss}/bin/lightningcss "$bin"; fi
    done
    exit $rc
  '';

  # NixOS: hatch would otherwise run the uv binary from the PyPI wheel.
  env.HATCH_ENV_TYPE_VIRTUAL_UV_PATH = "${pkgs.uv}/bin/uv";
}
