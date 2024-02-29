"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortingMethod = void 0;
const getSortingMethod = (sortBy) => {
    let sort;
    switch (sortBy) {
        case "popularity":
            sort = { unitsSold: -1 };
            break;
        case "pricelowhigh":
            sort = { price: 1 };
            break;
        case "pricehighlow":
            sort = { price: -1 };
            break;
        default:
            sort = { unitsSold: -1 };
            break;
    }
    return sort;
};
exports.getSortingMethod = getSortingMethod;
