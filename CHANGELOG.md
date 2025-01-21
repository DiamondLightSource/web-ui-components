# Changelog

## [2.2.2] - 2025-01-21

### Changed

- Enable "use client"; directive

## [2.2.1] - 2024-12-16

### Changed

- Peer dependency version upgrades

## [2.2.0] - 2024-10-09

### Added

- Add log scale options for `BoxPlot` and `ScatterPlot`

## [2.1.1] - 2024-09-09

### Added

- Flips `APNGViewer` width and height

## [2.1.0] - 2024-07-26

### Added

- `Flipper` component now takes same props as `Input` for its input section

## [2.0.0] - 2024-07-09

### Changed

- APNG files are now rendered in a canvas, rather than the native `img` DOM element

### Removed

- BREAKING: `autoplay` prop from `APNGViewer`. Users are advised to use the native `img` DOM element if they don't require playback control.

## [1.3.1] - 2024-02-19

### Changed

- Pagination component does not call `onPageChanged` callback if externally controlled page changes
- Cursor does not become pointer if there is no `onClick` event set for table
- Navbar takes multiple direct children

## [1.3.0] - 2024-01-04

### Changed

- Links in the navbar now must be declared as their own component (`NavLink` inside `NavLinks`)

### Added

- Colour palette documentation

## [1.2.0] - 2023-12-08

### Fixed

- Fix typo in Diamond colors

### Added

- TwoLineLink component, for links with descriptions

## [1.1.1] - 2023-12-07

### Changed

- Fix missing exports

## [1.1.0] - 2023-12-06

### Changed

- Added Breadcrumbs component
- Added DarkModeButton component
- Added dark theme variants to Diamond colours

## [1.0.2] - 2023-09-12

### Changed

- Table and Navbar components now accept all box properties

## [1.0.1] - 2023-07-31

### Added

- Clickable area for logout event in user component now spans whole width of menu

## [1.0.0] - 2023-07-26

### Added

- Initial public release
