# Salcido Ghost Theme

Source repo for the `salcido` Ghost theme used by `https://blog.otfusion.org`.

The theme is a personal blog design for Carta Stoica, with templates and styles focused on readable posts, content discovery, SEO metadata, and Ghost-native publishing.

## Repo Layout

- `ghost-theme/` - Ghost theme source files.
- `ghost-theme/assets/` - CSS and JavaScript used by the theme.
- `ghost-theme/partials/` - Shared Handlebars partials for cards, navigation, metadata, and reusable sections.
- `dist/` - Generated theme zip output.
- `Makefile` - Build, validation, cleanup, and version bump commands.
- `docs/` - Optional local audit/planning notes when present; not required for theme deployment.

## Common Commands

Validate the theme with GScan:

```sh
make validate
```

Build the uploadable theme zip without changing the version:

```sh
make build VERSION_BUMP=n
```

Build and bump the minor version:

```sh
make build VERSION_BUMP=1.1
```

Build and bump the major version:

```sh
make build VERSION_BUMP=1
```

Remove generated build output:

```sh
make clean
```

The upload artifact is:

```text
dist/salcido.zip
```

## Development Notes

- Edit theme files under `ghost-theme/`.
- Do not edit `dist/salcido.zip` directly; regenerate it with `make build`.
- Ghost site metadata, tag descriptions, navigation, post content, custom excerpts, and feature image alt text live in Ghost Admin, not this repo.
- `make validate` may report a GScan warning about missing custom fonts support. That warning is currently non-blocking for this theme.

## Deployment Checklist

1. Run `make validate`.
2. Run `make build VERSION_BUMP=n`, `make build VERSION_BUMP=1.1`, or `make build VERSION_BUMP=1`.
3. Upload `dist/salcido.zip` in Ghost Admin.
4. Verify:
   - Homepage
   - A post page
   - A tag page, such as `/tag/cafe/`
   - An author page, such as `/author/jose/`

