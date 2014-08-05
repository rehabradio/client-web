//callback handler for form submit

$(document).ready(function()
{
    $.ajax(
    {
        url : 'http://rehabradio.vagrant.local:8000/api/queue/next',
        type: "GET",
        success:function(data)
        {
            _build_now_playing(data)
        },
    });
    $.ajax(
    {
        url : 'http://rehabradio.vagrant.local:8000/api/queue/',
        type: "GET",
        success:function(data)
        {
            _build_queue_list(data)
        },
    });
});

function _build_now_playing(data){
    $('#now-playing > img').attr('src', data['album_cover_url'])
    $('#now-playing > h5').append(data['track_name'])
}

function _build_queue_list(results){
    var items = [];
    $(results).each(function(i, result) {
        var item = '<tr>'
            item += '<td>' + result['track_name'] + '</td>';
            item += '<td class="actions">';
                item += '<a href="#">Up</a> / ';
                item += '<a href="#">Down</a>';
            item += '</td>';
        item += '</tr>';
        items.push(item)
    });
    $('#queue > table > tbody').append(items.join(''));
}
