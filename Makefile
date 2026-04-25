THEME_DIR := ghost-theme
THEME_NAME := salcido
DIST_DIR := dist
ZIP_FILE := $(DIST_DIR)/$(THEME_NAME).zip
VERSION_BUMP ?=

.PHONY: build bump-version clean validate

build: bump-version
	rm -f $(ZIP_FILE)
	mkdir -p $(DIST_DIR)
	cd $(THEME_DIR) && zip -r ../$(ZIP_FILE) . \
		-x '.DS_Store' \
		-x '*/.DS_Store' \
		-x 'node_modules/*' \
		-x '*/node_modules/*' \
		-x '*.map' \
		-x '*.zip' \
		-x '.cache/*' \
		-x '*/.cache/*' \
		-x '.parcel-cache/*' \
		-x '*/.parcel-cache/*' \
		-x '.turbo/*' \
		-x '*/.turbo/*'

bump-version:
	@choice="$(VERSION_BUMP)"; \
	if [ -z "$$choice" ] && [ -t 0 ]; then \
		current=$$(node -p "require('./$(THEME_DIR)/package.json').version"); \
		printf "Current theme version: %s\n" "$$current"; \
		printf "Bump version before build? [n/1/1.1] "; \
		read choice; \
	fi; \
	case "$$choice" in \
		""|n|N|no|No|NO) \
			echo "Version unchanged."; \
			;; \
		1|1.1) \
			BUMP="$$choice" node -e 'const fs = require("fs"); const file = "$(THEME_DIR)/package.json"; const pkg = JSON.parse(fs.readFileSync(file, "utf8")); const parts = String(pkg.version).split(".").map(Number); while (parts.length < 3) parts.push(0); if (process.env.BUMP === "1") { parts[0] += 1; parts[1] = 0; parts[2] = 0; } else { parts[1] += 1; parts[2] = 0; } const before = pkg.version; pkg.version = parts.join("."); fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + "\n"); console.log(`Version bumped: ${before} -> ${pkg.version}`);'; \
			;; \
		*) \
			echo "Invalid VERSION_BUMP '$$choice'. Use n, 1, or 1.1."; \
			exit 1; \
			;; \
	esac

clean:
	rm -rf $(DIST_DIR)

validate:
	npx --yes gscan@latest $(THEME_DIR)
