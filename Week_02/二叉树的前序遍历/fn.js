/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/* 一：递归 */
var preorderTraversal = function (root) {
    let res = []
    const preorder = (root) => {
        if (!root) {
            return;
        }
        res.push(root.val);
        preorder(root.left);
        preorder(root.right);
    }
    preorder(root);
    return res;
};

/* 思路二：迭代，基于栈的遍历，创建一个手动维护的栈
1、创建数组res，存放中序遍历结果，
2、创建数组stack，模拟一个栈
3、创建迭代函数，结束条件为root为空，且栈也为空
        迭代内创建迭代，首先将当前节点压入res中（因为这是当前的根节点）
        将当前节点压入栈中，并设置其左节点为下一个根节点
        内层迭代结束后：
            将栈顶元素作为根节点，再开始迭代搜索其右节点
4、返回res数组 */
var preorderTraversal = function (root) {
    let res = [];
    let stack = [];
    while (root || stack.length) {
        while (root) {
            res.push(root.val);
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        root = root.right;
    }
    return res;
}