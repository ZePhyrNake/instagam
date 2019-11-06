$(function () {

    $("#search").click(function () {
        var searchword = $("#searchword").val();
        instrasearch(searchword);
        $("#posts").empty();
    });

    function instrasearch(searchwordht) {

        $.get(`https://www.instagram.com/explore/tags/${searchwordht}/?__a=1`, function (data, status) {

            $("#numberpost").text(data.graphql.hashtag.slug);
            $("#count").text(" = " + data.graphql.hashtag.edge_hashtag_to_media.count);

            // var imageUrl = data.graphql.hashtag.edge_hashtag_to_top_posts.edges[4].node.display_url;

            for (node in data.graphql.hashtag.edge_hashtag_to_top_posts.edges) {

                var post = data.graphql.hashtag.edge_hashtag_to_top_posts.edges[node];
                console.log(post.node.display_url);
                var row = `<div class="col-4">
                                <img src = "${post.node.display_url}" alt="" width='250px' height='250px'> 
                                <div>&#128077;&#127995; ${post.node.edge_liked_by.count} &#x1F4AC; ${post.node.edge_media_to_comment.count}</div>                        
                                <div class="card border-0" >  ${post.node.edge_media_to_caption.edges[0].node.text}<div>              
                           <div>`
                $('#posts').append(row);
                
            }

        });
    }
});