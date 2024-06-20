@echo off

REM Check if anything is running on port 4000 and kill it
netstat -ano | findstr :4000 | findstr /i "LISTENING"
IF %ERRORLEVEL% EQU 0 (
    FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :4000 ^| findstr /i "LISTENING"') DO (
        Taskkill /PID %%P /F
    )
) ELSE (
    echo No process is running on port 4000.
)

REM Check if anything is running on port 3306 and kill it
netstat -ano | findstr :3306 | findstr /i "LISTENING"
IF %ERRORLEVEL% EQU 0 (
    FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3306 ^| findstr /i "LISTENING"') DO (
        Taskkill /PID %%P /F
    )
) ELSE (
    echo No process is running on port 3306.
)