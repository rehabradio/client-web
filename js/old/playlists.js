//callback handler for form submit

$(document).ready(function()
{
    $.ajax(
    {
        //url : 'http://rehabradio.vagrant.local:8000/api/playlists/' + userId,
        url : 'http://rehabradio.vagrant.local:8000/api/playlists/1',
        type: "GET",
        success:function(data)
        {
            _build_playlist(data)
        },
    });
});

function _build_playlist(data){
    results = data['tracks']
    var items = [];
    $(results).each(function(i, result) {
        var item = '<tr>'
            item += '<td>' + result['name'] + '</td>';            
            item += '<td>' + result['album'] + '</td>';
            item += '<td>' + result['artists'] + '</td>';
            item += '<td></td>';
            item += '<td></td>';
            item += '<td class="actions">';
                item += '<a href="' + result['add_to_queue'] + '">Queue</a>';
            item += '</td>';
        item += '</tr>';
        items.push(item)
    });
    $('#personal-playlist > tbody').append(items.join(''));
}