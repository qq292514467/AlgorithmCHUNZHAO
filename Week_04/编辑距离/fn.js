var minDistance = function(word1, word2) {
    if(word1 == word2){
        return 0;
    }
    // 行
    var n = word1.length;
    // 列
    var m = word2.length;
    if(!n || !m){
        return n || m;
    }
    var dp = Array.from(new Array(n+1),() => new Array(m+1).fill(0));
    for(var i = 1;i <= n;++i){
        dp[i][0] = dp[i-1][0] + 1;
    }
    for(var j = 1;j <= m;++j){
        dp[0][j] = dp[0][j-1] + 1;
    }
    for(var i = 1;i <= n;++i){
        for(var j = 1;j <= m;++j){
            if(word1[i-1] == word2[j-1]){
                dp[i][j] = dp[i-1][j-1];
            }else{
                dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])+1;
            }
        }
    }
    return dp[n][m];
};