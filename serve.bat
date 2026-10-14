@echo off
cd /d "%~dp0"
start http://localhost:8080/option-a.html
python -m http.server 8080
