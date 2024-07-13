
function binarySearchRankCustomer(list, size, id) {
    let left = 0;
    let right = size - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = list[mid].MaMucDoThanThiet;

        if (midValue === id) {
            return mid;
        } else if (midValue < id) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

module.exports = {
    binarySearchRankCustomer
};