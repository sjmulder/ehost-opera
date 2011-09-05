PACKAGED_FILES = config.xml images/button.png images/icon.png includes/injected.js index.html

all: ehost.oex

ehost.oex: $(PACKAGED_FILES)
	rm -f ehost.oex
	zip ehost.oex $(PACKAGED_FILES)
