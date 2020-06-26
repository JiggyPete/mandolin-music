require "net/http"
require "uri"


def fetch_artists_page_urls_from_grouping_page
  result = []
  postfixes = ('a'..'z').to_a
  postfixes << "0-9"

  postfixes.each do |postfix|
    url = "https://mandotabs.com/artist/#{postfix}/"
    result << fetch_artist_page_urls_from(url)
  end

  result.flatten
end

def fetch_artist_page_urls_from(url)
  uri = URI(url)
  html = Net::HTTP.get(uri)

  process_artist_list_html url, html
end

def process_artist_list_html(url, html)
  result = []
  list_items = html.split('<ul class="archivelist">')
  artist_list_html = list_items[1].split("</ul>")[0]
  links = artist_list_html.split('<a href="')
  links.shift(1)
  links.each do |link|
    result << link.split('" title=')[0]
  end

  result
end

def band(html)
  html.split("<h3>")[1].split("</h3")[0].gsub("&#8217;", "'")
end

def fetch_songs_at(url)
  uri = URI(url)
  html = Net::HTTP.get(uri)

  band_name = band(html)
  puts "Fetching songs for #{band_name}"
  result = []
  list_items = html.split('<ul class="archivelist">')
  artist_list_html = list_items[1].split("</ul>")[0]
  links = artist_list_html.split('<a href="')
  links.shift(1)

  links.each do |link_and_trailing_html|
    link = link_and_trailing_html.split('" title=')[0]
    song_name = link_and_trailing_html.split('" title="')[1].split('"')[0].gsub("&#8217;", "'")
    result << {
      band: band_name,
      song: song_name,
      link: link
    }
  end

  result.uniq! {|r| r[:link] }
  result
end

def data_from_template(track)
  <<-JSON_OUTPUT
          {
            "name": "#{track[:song]}",
            "from": "mandotabs",
            "genre": "",
            "type": "",
            "composer": "#{track[:band]}",
            "score": "",
            "tab": "#{track[:link]}",
            "audio": "",
            "video": ""
          },
JSON_OUTPUT
end

tracks = []
artist_urls = fetch_artists_page_urls_from_grouping_page

artist_urls.each do |url|
  tracks << fetch_songs_at(url)
end
tracks.flatten!
tracks.compact!
puts "#{tracks.length} Tracks found"


tracks.each do |t|
  puts data_from_template(t)
end
