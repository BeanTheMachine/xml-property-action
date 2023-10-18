# xml-property-action
A simple GitHub Action to allow the extraction of the inner text of an XML node within a file using XPath.

This was originally created to pull the VersionPrefix property from .csproj files within projects built by GitHub Actions.

## Usage Example
```yaml
# .github/workflows/release-preview.yml

on:
  push:
    # ...
  pull_request:
    # ...

jobs:
  build:
    # ...
    steps:
      # ...
      - name: Get version prefix
        id: get_version_prefix
        uses: BeanTheMachine/xml-property-action@v1.0.0
        with:
          # XML file to extract text from
          file: "MyProjectName/MyProjectName.csproj"
          # XPath expression
          xpath: "//PropertyGroup/VersionPrefix"
      - name: Push
        # Use steps.<action_step_id>.outputs.property to use the extracted text in another step
        run: dotnet nuget push "MyProjectName/bin/Release/MyProjectName.${{steps.get_version_prefix.outputs.property}}-${{github.ref_name}}-${{github.run_number}}.nupkg" --source "https://nuget.pkg.github.com/MyUsername/index.json" --api-key ${{secrets.MY_ACCESS_TOKEN}}
```
