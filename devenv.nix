{ config, lib, pkgs, ... }:
{
  languages.javascript.enable = true;
  languages.javascript.npm.enable = true;
  languages.javascript.pnpm.enable = true;

  ## Tweaks

  # NixOS: lightningcss-cli's npm postinstall copies a prebuilt generic-Linux
  # binary that cannot run without nix-ld. Shim pnpm so that after every
  # invocation (notably `pnpm install`, before the build steps that follow it)
  # the copy is replaced by a symlink to Nix's build. Only the directory entry
  # changes; the pnpm store copy is untouched.
  scripts.pnpm.exec = ''
    ${config.languages.javascript.pnpm.package}/bin/pnpm "$@"
    rc=$?
    for bin in "${config.devenv.root}"/node_modules/.pnpm/lightningcss-cli@*/node_modules/lightningcss-cli/lightningcss; do
      if [ -e "$bin" ] || [ -L "$bin" ]; then ln -sf ${pkgs.lightningcss}/bin/lightningcss "$bin"; fi
    done
    exit $rc
  '';
}
