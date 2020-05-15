require "net/http"
require "uri"

def fetch_website_dir_contents(url, data_bag)
  uri = URI(url)
  html = Net::HTTP.get(uri)

  process_html url, html, data_bag
end

def process_html(url, html, data_bag)
  list_items = html.split("<li>")
  list_items.shift(2)
  urls = list_items.map{|item| item.split("href=\"")[1].split("\"")[0] }
  dirs = urls.select{ |u| u.end_with?("/") }

  data_bag[:pdfs] << urls.select{ |u| u.end_with?(".pdf") }.map{|filename| url + filename}
  data_bag[:mp3s] << urls.select{ |u| u.end_with?(".mp3") }.map{|filename| url + filename}

  dirs.each do |dir|
    new_url = url + dir
    fetch_website_dir_contents new_url, data_bag
  end
end


data_bag = { pdfs: [], mp3s: [] }
root_url = "http://www.nigelgatherer.com/tunes/"
fetch_website_dir_contents root_url, data_bag

puts data_bag[:pdfs].flatten
puts data_bag[:mp3s].flatten
