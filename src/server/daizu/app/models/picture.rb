class Picture < ActiveRecord::Base
  attr_accessible :avatar

  #dir = OpenSSL::Digest::SHA1.hexdigest("fadsfasd")[0..1]
  has_attached_file :avatar,
                    #:url => "/system/#{dir}/:hash.:extension",
                    :path => ":rails_root/public/uploaded/:id_partition/:style/:hash.:extension",
                    :url => "/uploaded/:id_partition/:style/:hash.:extension",
                    :hash_secret => "longSecretString",
                    :styles => { :large => "640x640",
                                 :medium => "320x320>",
                    		 :small => "160x160>" },
                    :default_url => "/images/:style/missing.png"
  def image_large
  	avatar.url(:large)
  end
  def image_medium
    avatar.url(:medium)
  end
  def image_small
    avatar.url(:small)
  end
end
