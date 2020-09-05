.PHONY: usage
usage:
	@echo ""
	@echo " $(L)┏━━━━━━━━━━━━━━━━━━━━━┓$(R)"
	@echo " $(L)┃   $(R)AppSync Template Tester$(L)   ┃$(R)"
	@echo " $(L)┡━━━━━━━━━━━━━━━━━━━━━┩$(R)"
	@echo " $(L)│ $(R)Available Commands:$(L) │$(R)"
	@echo " $(L)╰─┬───────────────────╯$(R)"
	@echo "   $(L)├─$(R) $(P)build$(R)               • Builds the distributed package."
	@echo "   $(L)├─$(R) $(P)test$(R)               • Runs tests."
	@echo "   $(L)╰─$(R) $(P)clean$(R)          • Removes any existing build."
	@echo ""
SRC = $(shell find src -type f)
.PHONY: build
build: dist
dist: $(SRC)
	npm run-script build
.PHONY: test
test: build
	npm run-script test
.PHONY: clean
clean:
	rm -rf dist
