@echo off
echo Starting IT Internship Project Development Environment...
echo.

REM Set environment
set NODE_ENV=development

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

REM Check if Prisma client is generated
if not exist "generated\prisma" (
    echo Generating Prisma client...
    npx prisma generate
    echo.
)

echo Starting development servers...
echo Frontend will be available at: http://localhost:5173
echo Backend API will be available at: http://localhost:3001
echo.

REM Start both frontend and backend
npm run dev:full
