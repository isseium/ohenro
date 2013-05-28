#-*- coding: utf-8 -*-
# ワーカーの数
worker_processes 2

# RAILS_ROOT を指定
#working_directory "/usr/share/repos/rails_app"

# ソケット
#listen  '/usr/share/repos/rails_app/tmp/sockets/unicorn.sock'
listen  '/tmp/unicorn.sock'
pid     '/tmp/unicorn.pid'

# ログ
log = '/var/log/rails/unicorn.log'
stderr_path File.expand_path('log/unicorn.log', ENV['RAILS_ROOT'])
stdout_path File.expand_path('log/unicorn.log', ENV['RAILS_ROOT'])

# ダウんタイムなくす
preload_app true

before_fork do |server, worker|
  defined?(ActiveRecord::Base) and ActiveRecord::Base.connection.disconnect!

  old_pid = "#{ server.config[:pid] }.oldbin"
  unless old_pid == server.pid
    begin
      Process.kill :QUIT, File.read(old_pid).to_i
      rescue Errno::ENOENT, Errno::ESRCH
    end
  end
end

after_fork do |server, worker|
  defined?(ActiveRecord::Base) and ActiveRecord::Base.establish_connection
end
