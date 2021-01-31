/**
 * Javascript定义一棵二叉树
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

 /* 思路一：递归
 1、创建空数组，存储中序遍历结果
 2、创建递归函数，中序遍历二叉树
        结束递归条件：当前节点为空
        先递归所有左边节点，完成后将当前节点的根节点压如res中，接着递归右边节点
3、调用递归函数，传入二叉树节点root */
var inorderTraversal = function(root) {
    let res = [];
    const inorder = (root) => {
        if (!root) {
            return;
        }
        inorder(root.left);
        res.push(root.val);
        inorder(root.right);
    }
    inorder(root);
    return res;
};

/* 思路二：迭代，基于栈的遍历，手动传遍并维护一个栈
1、创建数组res，存放中序遍历结果，
2、创建数组stack，模拟一个栈
3、创建迭代函数，结束条件为root为空，且栈也为空
        迭代内创建迭代，将二叉树的节点依次压入栈中，并从左节点开始继续迭代
        内层迭代结束后，
            栈顶元素即为最左节点，令其出栈放入res中，
            再以该栈顶元素为根节点，从其右节点开始下一次外层迭代
4、返回res数组 */
var inorderTraversal = function(root) {
    let res = [];
    let stack = [];
    while (root || stack.length) {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        res.push(root.val);
        root = root.right;
    }
    return res;
}