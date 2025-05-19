const fruits = [
  { fruitId: 1, fruitName: 'Apel', fruitType: 'IMPORT', stock: 10 },
  { fruitId: 2, fruitName: 'Kurma', fruitType: 'IMPORT', stock: 20 },
  { fruitId: 3, fruitName: 'apel', fruitType: 'IMPORT', stock: 50 },
  { fruitId: 4, fruitName: 'Manggis', fruitType: 'LOCAL', stock: 100 },
  { fruitId: 5, fruitName: 'Jeruk Bali', fruitType: 'LOCAL', stock: 10 },
  { fruitId: 5, fruitName: 'KURMA', fruitType: 'IMPORT', stock: 20 },
  { fruitId: 5, fruitName: 'Salak', fruitType: 'LOCAL', stock: 150 }
];

// 1. Buah apa saja yang dimiliki Andi?
function getUniqueFruits(fruits) {
  const names = fruits.map(f => f.fruitName.toLowerCase());
  return [...new Set(names)];
}

// 2. Buah per wadah berdasarkan tipe
function getFruitByType(fruits) {
  const result = { IMPORT: [], LOCAL: [] };
  fruits.forEach(f => {
    const lower = f.fruitName.toLowerCase();
    if (!result[f.fruitType].map(name => name.toLowerCase()).includes(lower)) {
      result[f.fruitType].push(f.fruitName);
    }
  });
  return result;
}

// 3. Total stok di wadah
function getTotalStockByType(fruits) {
  return fruits.reduce((acc, fruit) => {
    acc[fruit.fruitType] = (acc[fruit.fruitType] || 0) + fruit.stock;
    return acc;
  }, {});
}

// 4. Komentar
function getComments(fruits) {
  const comments = [];

  // Cek duplicate ID
  const idCounts = {};
  fruits.forEach(f => {
    idCounts[f.fruitId] = (idCounts[f.fruitId] || 0) + 1;
  });
  const duplicateIds = Object.entries(idCounts).filter(([_, v]) => v > 1);
  if (duplicateIds.length > 0) {
    comments.push("Terdapat duplikasi 'fruitId' pada data.");
  }

  // Cek duplicate name (case-insensitive)
  const nameMap = {};
  fruits.forEach(f => {
    const name = f.fruitName.toLowerCase();
    nameMap[name] = (nameMap[name] || 0) + 1;
  });
  const duplicates = Object.entries(nameMap).filter(([_, v]) => v > 1);
  if (duplicates.length > 0) {
    comments.push("Terdapat duplikasi nama buah dengan penulisan berbeda (case-sensitive).");
  }

  return comments;
}

// Output
console.log("1. Buah yang dimiliki Andi:", getUniqueFruits(fruits));
console.log("2. Wadah berdasarkan tipe:", getFruitByType(fruits));
console.log("3. Total stok per wadah:", getTotalStockByType(fruits));
console.log("4. Komentar:", getComments(fruits));