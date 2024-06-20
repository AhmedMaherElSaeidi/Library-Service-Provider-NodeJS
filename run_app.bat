@echo off

REM Check if anything is running on port 4000 and kill it
netstat -ano | findstr :4000 | findstr /i "LISTENING"
IF %ERRORLEVEL% EQU 0 (
    FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :4000 ^| findstr /i "LISTENING"') DO (
        Taskkill /PID %%P /F
    )
)

REM Run npm start to start the development server
npm start
