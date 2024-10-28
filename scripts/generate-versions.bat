@echo off
:: Kiểm tra tham số truyền vào
if "%~1"=="" (
    echo Please specify the directory.
    exit /b 1
)

:: Chuyển đổi đường dẫn tương đối thành tuyệt đối cho TARGET_DIR
set "TARGET_DIR=%~f1"
set "VERSION_FILE=%TARGET_DIR%\versions.json"

:: Kiểm tra xem thư mục có tồn tại không
if not exist "%TARGET_DIR%" (
    echo Folder %TARGET_DIR% is not exist.
    exit /b 1
)

:: Kiểm tra xem versions.json đã tồn tại chưa, nếu chưa thì tạo mới
if not exist "%VERSION_FILE%" (
    echo Create new file %VERSION_FILE% .
) else (
    echo To update %VERSION_FILE% in folder %TARGET_DIR%.
)

:: Khởi tạo nội dung JSON
echo { > "%VERSION_FILE%"

setlocal enabledelayedexpansion

for %%f in ("%TARGET_DIR%\*") do (
    if not "%%~nxf"=="versions.json" (
        :: Tạo hash của file (yêu cầu có Git)
        for /f %%h in ('git hash-object "%%f"') do (
            set "file_hash=%%h"
        )

        :: Kiểm tra xem file_hash có giá trị không
        if defined file_hash (
            set "file_name=%%~nxf"
            echo   "!file_name!": "!file_hash!", >> "%VERSION_FILE%"
        ) else (
            echo Can not get hash for file: %%f
        )
    )
)

:: Loại bỏ dấu phẩy cuối cùng
powershell -Command "(Get-Content -Path '%VERSION_FILE%' -Raw) -replace ',\n}$', '\n}' | Set-Content -Path '%VERSION_FILE%'"

echo } >> "%VERSION_FILE%"
echo Updated file %VERSION_FILE%.

endlocal
