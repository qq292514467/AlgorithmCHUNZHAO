/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/* 思路一：递归（对于递归，可以理解为调用递归函数时已经获得了结果，避免陷入人肉递归的情况）
分析该题，发现只会有几种情况
    1：当前root节点为空，即root下未搜索到p和q，返回null
    2：p、q分别在root的左、右节点上
    3：p或q是另一个节点的根节点，即p或q在root的同一个子树中 */
/* 1、设置递归结束条件：
        1）当前root为空，返回null
        2）或当前root遍历到了p（p只是举例），由于LCA要么是当前p节点（q在p的子树中）
            要么是在p节点之上，不需要往下遍历，只需要返回当前的p节点    
2、对左、右子树调用递归函数，返回值分别赋给变量left、right
3、递归完成后执行判断
    如果左右子树都有返回值，则说明p、q分别在左右子树中，root即为LCA
    如果左右子树中只有一个有返回值，则说明p、q在同一个子树中，返回left/right变量节点 */
var lowestCommonAncestor = function (root, p, q) {
    if (!root) {
        return;
    }
    if (root == p || root == q) {
        return root;
    }
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);
    if (left && right) {
        return root;
    }
    if (left == null) {
        return right;
    }
    return left;
}


/* 思路二：存储父节点（用js写答案超出时间限制..） */
/* 思路:
我们可以用哈希表存储所有节点的父节点，然后我们就可以利用节点的父节点信息从 p 结点开始不断往上跳，并记录已经访问过的节点，再从 q 节点开始不断往上跳，如果碰到已经访问过的节点，那么这个节点就是我们要找的最近公共祖先。

算法:
从根节点开始遍历整棵二叉树，用哈希表记录每个节点的父节点指针。
从 p 节点开始不断往它的祖先移动，并用数据结构记录已经访问过的祖先节点。
同样，我们再从 q 节点开始不断往它的祖先移动，如果有祖先已经被访问过，即意味着这是 p 和 q 的深度最深的公共祖先，即 LCA 节点。
 */
/* var lowestCommonAncestor = function (root, p, q) {
    let map = new Map();
    let set = new Set();
    // map.set(root.val, root);
    const dfs = (root) => {
        if (root.left) {
            map.set(root.left.val, root.left);
            dfs(root.left);
        }
        if (root.right) {
            map.set(root.right.val, root.right);
            dfs(root.right);
        }
    }
    dfs(root)
    while (p) {
        set.add(p.val);
        p = map.get(p.val);
    }
    while (q) {
        if (set.has(q.val)) {
            return q;
        }
        q = map.get(q.val);
    }
    return null;
}
 */