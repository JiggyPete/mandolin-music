# require 'file'

terminal_output = `cd ../../music; find nigel-gatherer -name "*.mp3" -print && find nigel-gatherer -name "*.pdf" -print`
output = terminal_output.gsub("nigel-gatherer/", "")

File.write("local_files.txt", output)
