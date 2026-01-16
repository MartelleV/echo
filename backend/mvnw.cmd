@REM mvnw.cmd - Maven Wrapper script for Windows
@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.
@REM ----------------------------------------------------------------------------

@echo off
setlocal

set SCRIPT_DIR=%~dp0
set MAVEN_WRAPPER_JAR=%SCRIPT_DIR%.mvn\wrapper\maven-wrapper.jar
set MAVEN_WRAPPER_PROPERTIES=%SCRIPT_DIR%.mvn\wrapper\maven-wrapper.properties
set MAVEN_VERSION=3.9.9
set WRAPPER_URL=https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.2/maven-wrapper-3.3.2.jar

if not exist "%SCRIPT_DIR%.mvn\wrapper" mkdir "%SCRIPT_DIR%.mvn\wrapper"

if not exist "%MAVEN_WRAPPER_JAR%" (
    echo Downloading Maven Wrapper...
    powershell -Command "Invoke-WebRequest -Uri '%WRAPPER_URL%' -OutFile '%MAVEN_WRAPPER_JAR%'"
)

if not exist "%MAVEN_WRAPPER_PROPERTIES%" (
    echo distributionUrl=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/%MAVEN_VERSION%/apache-maven-%MAVEN_VERSION%-bin.zip > "%MAVEN_WRAPPER_PROPERTIES%"
)

if defined JAVA_HOME (
    set JAVA_CMD=%JAVA_HOME%\bin\java
) else (
    set JAVA_CMD=java
)

"%JAVA_CMD%" -jar "%MAVEN_WRAPPER_JAR%" %*

endlocal
