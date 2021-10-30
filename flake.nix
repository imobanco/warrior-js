{
  description = "Flake para o ambiente do warrior-js";

  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          system = "x86_64-linux";
          config = { allowUnfree = true; };
        };
        hack = pkgs.writeShellScriptBin "hack" ''
          # https://dev.to/ifenna__/adding-colors-to-bash-scripts-48g4
          echo -e '\n\n\n\e[32m\tAmbiente pronto!\e[0m\n'
          echo -e '\n\t\e[33mignore as proximas linhas...\e[0m\n\n\n'
        '';
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            hack
            gnumake
            nodejs-12_x
          ];
          shellHook = ''
            hack
          '';
        };
      }
    );
}
