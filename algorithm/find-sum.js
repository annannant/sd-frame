function findSubsetSums(numbers, targetSum) {
  const results = [];
  backtrack(numbers, targetSum, 0, [], results);
  return results;
}

function backtrack(numbers, targetSum, startIndex, currentSubset, results) {
  if (targetSum === 0) {
    results.push([...currentSubset]);
    return;
  }
  if (targetSum < 0 || startIndex >= numbers.length) {
    return;
  }
  for (let i = startIndex; i < numbers.length; i++) {
    const num = numbers[i];
    currentSubset.push(num);
    backtrack(numbers, targetSum - num, i + 1, currentSubset, results);
    currentSubset.pop();
  }
}

const numbers = [
  31, 31, 22.5, 22.5, 26.5, 26.5, 15.5, 15.5, 26.5, 26.5, 15.5, 15.5, 26.5,
  26.5, 15.5, 15.5, 26.5, 26.5, 15.5, 15.5, 26.5, 26.5, 15.5, 15.5, 17.5, 17.5,
  14.5, 14.5, 17.5, 17.5, 14.5, 14.5, 17.5, 17.5, 14.5, 14.5, 17.5, 17.5, 14.5,
  14.5, 17.5, 17.5, 14.5, 14.5, 17.5, 17.5, 14.5, 14.5
];

const targetSum = 120;

const result = findSubsetSums(numbers, targetSum);

if (result.length > 0) {
  console.log("วิธีการบวกเลขทั้งหมดที่รวมแล้วเท่ากับ 120 คือ:");
  result.forEach((subset, index) => {
    console.log(`วิธีที่ ${index + 1}:`);
    console.log("  ตัวเลขที่ใช้:", subset.join(", "));
  });
} else {
  console.log("ไม่พบวิธีการบวกเลขที่รวมแล้วเท่ากับ 120");
}
