/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/* 思路一：递归 */
var preorderTraversal = function (root) {
    let res = [];
    const postorder = (root) => {
        if (!root) {
            return;
        }
        // 后续遍历，从左往右遍历子节点递归
        for (let i = 0; i < root.children.length; i++) {
            postorder(root.children[i]);
        }
        res.push(root.val);
    }
    postorder(root);
    return res;
}