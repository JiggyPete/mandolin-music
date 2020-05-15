require 'json'

json_text = File.read("master-data.json")
json_data = JSON.parse(json_text)

sorted_json_data = json_data.sort do |song, next_song|
  song["name"] <=> next_song["name"]
end

updated_contents = "data = #{sorted_json_data.to_json}"

File.write("data.json", updated_contents)
