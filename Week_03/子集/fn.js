/*  */
/*  */
var subsets = function (nums) {
    let res = [[]];
    let
    if (!nums) { return res; }
    const subArr = (nums) => {
        if (!nums) {
            return [];
        }
        
        subArr();

        return res;
    }
    subArr(nums);
    return res;
};