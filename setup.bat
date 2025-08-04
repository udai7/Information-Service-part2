@echo off
echo Installing dependencies for Government Services Platform...

echo.
echo Installing root dependencies...
npm install

echo.
echo Installing frontend dependencies...
cd frontend
npm install
cd ..

echo.
echo Installing backend dependencies...
cd backend
npm install
cd ..

echo.
echo Setup complete! 
echo.
echo To start development:
echo   npm run dev
echo.
echo To set up database:
echo   npm run db:generate
echo   npm run db:push
echo.

pause
