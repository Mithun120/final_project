import subprocess
import os

folder_path = r'C:\Users\MithunM\Desktop\Final_Project'

# Change to the specified folder
os.chdir(folder_path)

server_command = 'cd server && nodemon server.js'
subprocess.Popen(['cmd', '/c', server_command], shell=True)
client_command = 'cd client && npm run dev'
subprocess.Popen(['cmd', '/c', client_command], shell=True)

