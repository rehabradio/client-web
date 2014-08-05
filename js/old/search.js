//callback handler for form submit

$(document).ready(function()
{
    query = $("#query").html()
    console.log(query)
    $.ajax(
    {
        url : 'http://rehabradio.vagrant.local:8000/api/metadata/search/spotify/?q=' + query,
        type: "GET",
        success:function(data)
        {
            _build_track_list(data)
        },
    });
    $.ajax(
    {
        url : 'http://rehabradio.vagrant.local:8000/api/metadata/search/soundcloud/?q=' + query,
        type: "GET",
        success:function(data, textStatus, jqXHR)
        {
            _build_track_list(data)
        },
    });
});

function _build_track_list(data){
    results = data['results']
    source_type = results[0]['source_type']
    var items = [];
    $(data.results).each(function(i, result) {
        var item = '<tr>'
            item += '<td>' + result['artists'][0]['name'] + '</td>';
            item += '<td>' + result['name'] + '</td>';
            item += '<td class="actions">';
                item += '<a href="http://rehabradio.vagrant.local:8000/api/metadata/tracks/add/?source_type=' + source_type + '&source_id=' + result['source_id'] + '&queue_track=1">Queue</a>';
                item += '<a href="http://rehabradio.vagrant.local:8000/api/metadata/tracks/add/playlist/?source_type=' + source_type + '&source_id=' + result['source_id'] + '">Save</a>';
                item += '<a href="http://rehabradio.vagrant.local:8000/api/metadata/tracks/add/playlist/?source_type=' + source_type + '&source_id=' + result['source_id'] + '&queue_track=1">Save & Queue</a>';
            item += '</td>';
        item += '</tr>';
        items.push(item)
    });
    $('#' + source_type + '_results > table > tbody').append(items.join(''));
}