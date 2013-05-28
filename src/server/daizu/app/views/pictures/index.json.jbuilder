json.array!(@pictures) do |picture|
  json.extract! picture, :avatar_file_name, :avatar_file_size, :avatar_url
  json.url picture_url(picture, format: :json)
end
