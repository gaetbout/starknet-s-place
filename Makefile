# Build and test
build :; nile compile
test  :; pytest tests/
front :; npm run dev