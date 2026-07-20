.PHONY: tags patch publish

CURRENT_VERSION := $(shell node -p "require('./package.json').version")
PARTS          := $(subst ., ,$(CURRENT_VERSION))
MAJOR          := $(word 1,$(PARTS))
MINOR          := $(word 2,$(PARTS))
PATCH          := $(word 3,$(PARTS))
NEXT_PATCH     := $(shell expr $(PATCH) + 1)
NEXT_VERSION   := $(MAJOR).$(MINOR).$(NEXT_PATCH)

tags:
	@git tag --sort=-v:refname

patch:
	@echo "$(CURRENT_VERSION) → $(NEXT_VERSION)"
	@node -e "\
		const fs = require('fs'); \
		const pkg = JSON.parse(fs.readFileSync('package.json','utf8')); \
		pkg.version = '$(NEXT_VERSION)'; \
		fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');"
	@git add package.json
	@git commit -m "chore: bump version to $(NEXT_VERSION)"
	@git tag v$(NEXT_VERSION)
	@git push origin HEAD
	@git push origin v$(NEXT_VERSION)
	@echo "Tagged v$(NEXT_VERSION) and pushed."

publish:
	@echo "Publishing v$(CURRENT_VERSION) to npm..."
	@npm publish --access public
	@echo "Published $(CURRENT_VERSION)."
