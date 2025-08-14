import { PrismaClient } from '@prisma/client';

async function checkSchemes() {
  const prisma = new PrismaClient();

  try {
    const schemes = await prisma.schemeService.findMany({
      where: { status: 'published' },
      select: { 
        id: true, 
        name: true, 
        type: true, 
        isActive: true 
      }
    });

    console.log('Published Schemes:');
    schemes.forEach(scheme => {
      console.log(`- ID: ${scheme.id}, Name: "${scheme.name}", Type: "${scheme.type}", Active: ${scheme.isActive}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchemes();
