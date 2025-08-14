const { PrismaClient } = require('@prisma/client');

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

    // Now check specifically for State type schemes
    const stateSchemes = await prisma.schemeService.findMany({
      where: { 
        status: 'published',
        type: 'State'
      },
      select: { 
        id: true, 
        name: true, 
        type: true, 
        isActive: true 
      }
    });

    async function checkSchemes() {
  const prisma = new PrismaClient();

  try {
    const schemes = await prisma.schemeService.findMany({
      where: { status: 'published' },
      select: { 
        id: true, 
        name: true, 
        type: true, 
        summary: true,
        isActive: true 
      }
    });

    console.log('Published Schemes:');
    schemes.forEach(scheme => {
      console.log(`
- ID: ${scheme.id}`);
      console.log(`  Name: "${scheme.name}"`);
      console.log(`  Type: "${scheme.type}"`);
      console.log(`  Summary: "${scheme.summary}"`);
      console.log(`  Active: ${scheme.isActive}`);
    });

    // Also check Employment schemes specifically
    console.log('
=== Employment Schemes Specifically ===');
    const employmentSchemes = await prisma.schemeService.findMany({
      where: { 
        status: 'published',
        type: 'Employment',
        isActive: true
      },
      select: { 
        id: true, 
        name: true, 
        summary: true
      }
    });

    employmentSchemes.forEach(scheme => {
      console.log(`
Employment Scheme - ID: ${scheme.id}`);
      console.log(`  Name: "${scheme.name}"`);
      console.log(`  Summary: "${scheme.summary}"`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}
    stateSchemes.forEach(scheme => {
      console.log(`- ID: ${scheme.id}, Name: "${scheme.name}", Type: "${scheme.type}", Active: ${scheme.isActive}`);
    });

    // Check all active state schemes
    const activeStateSchemes = await prisma.schemeService.findMany({
      where: { 
        status: 'published',
        type: 'State',
        isActive: true
      },
      select: { 
        id: true, 
        name: true, 
        type: true, 
        isActive: true 
      }
    });

    console.log('\nActive State Type Schemes:');
    activeStateSchemes.forEach(scheme => {
      console.log(`- ID: ${scheme.id}, Name: "${scheme.name}", Type: "${scheme.type}", Active: ${scheme.isActive}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchemes();
