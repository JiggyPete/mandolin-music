current_files = File.readlines("current_remote_files.txt")
previous_files = File.readlines("latest_remote_files.txt")

puts "current_files: #{current_files.length}"
puts "previous_files: #{previous_files.length}"

unknown_new_files = current_files.select{|file| !previous_files.include?(file) }
puts "unknown_new_files: #{unknown_new_files.length}"
puts unknown_new_files

puts ""
old_deleted_files = previous_files.select{|file| !current_files.include?(file) }
puts "old deleted files: #{old_deleted_files.length}"
puts old_deleted_files
