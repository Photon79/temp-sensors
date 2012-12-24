require(['/js/jquery.js', '/socket.io/socket.io.js', '/js/date.format.js', '/js/knockout.js'], function(jquery, io, format, ko) {
    $(document).ready(function() {
        console.log('Document ready')
        window.sensor1 = io.connect('http://localhost/sensor1'), 
        window.sensor2 = io.connect('http://localhost/sensor2'), 
        window.sensor3 = io.connect('http://localhost/sensor3');
        var bindings = {
                sensor1: {
                    name: '',
                    value: '',
                    timestamp: ''
                },
                sensor2: {
                    name: '',
                    value: '',
                    timestamp: ''
                },
                sensor3: {
                    name: '',
                    value: '',
                    timestamp: ''
                }
            };
        sensor1.on('data', function (data) {  
            data = data.data[0];
            date = new Date(data.timestamp);
            data.timestamp = date.format('mm/dd/yyyy hh:MM:ss tt');
            data.value += '&deg;';
            bindings.sensor1 = data;
            ko.applyBindings(bindings);
            var pos_w = $('#sensor1 .pos').width()
              , val_w = $('#sensor1 .val').width()
              , deg_w = $('#sensor1 .minus').width() / 50
              , pos_l = Math.ceil($('#sensor1 .minus').width() - (pos_w / 2) + parseFloat(data.value) * deg_w)
              , val_l = Math.ceil($('#sensor1 .minus').width() - (val_w / 2) + parseFloat(data.value) * deg_w);
            console.log('Sensor1', '-', $('#sensor1 .minus').width(), '+', $('#sensor1 .plus').width(), $('#sensor1 .value').width(), 'pos_w', pos_w, 'val_w', val_w, 'deg_w', deg_w, 'pos_l', pos_l, 'val_l', val_l);
            $('#sensor1 .pos').css({left: pos_l + 'px'});
            $('#sensor1 .val').css({left: val_l + 'px'});
        }).on('error', function() {
            $('<div class="error">Error while trying to update record in DB</div>').appendTo($('#messages'));
            setTimeout('$(".error").remove();', 3000);
        }).on('success', function() {
            $('<div class="success">DB record updated successfully</div>').appendTo($('#messages'));
            setTimeout('$(".success").remove();', 3000);
        });
        sensor2.on('data', function (data) {    
            data = data.data[0]
            date = new Date(data.timestamp);
            data.timestamp = date.format('mm/dd/yyyy hh:MM:ss tt');
            data.value += '&deg;';
            bindings.sensor2 = data;
            ko.applyBindings(bindings);
            var pos_w = $('#sensor2 .pos').width()
              , val_w = $('#sensor2 .val').width()
              , deg_w = $('#sensor2 .minus').width() / 50
              , pos_l = Math.ceil($('#sensor2 .minus').width() - (pos_w / 2) + parseFloat(data.value) * deg_w)
              , val_l = Math.ceil($('#sensor2 .minus').width() - (val_w / 2) + parseFloat(data.value) * deg_w);
            console.log('Sensor2', '-', $('#sensor2 .minus').width(), '+', $('#sensor2 .plus').width(), $('#sensor2 .value').width(), 'pos_w', pos_w, 'val_w', val_w, 'deg_w', deg_w, 'pos_l', pos_l, 'val_l', val_l);
            $('#sensor2 .pos').css({left: pos_l + 'px'});
            $('#sensor2 .val').css({left: val_l + 'px'});
        }).on('error', function() {
            $('<div class="error">Error while trying to update record in DB</div>').appendTo($('#messages'));
            setTimeout('$(".error").remove();', 3000);
        }).on('success', function() {
            $('<div class="success">DB record updated successfully</div>').appendTo($('#messages'));
            setTimeout('$(".success").remove();', 3000);
        });
        sensor3.on('data', function (data) {    
            data = data.data[0]
            date = new Date(data.timestamp);
            data.timestamp = date.format('mm/dd/yyyy hh:MM:ss tt');
            data.value += '&deg;';
            bindings.sensor3 = data;
            ko.applyBindings(bindings);
            var pos_w = $('#sensor3 .pos').width()
              , val_w = $('#sensor3 .val').width()
              , deg_w = $('#sensor3 .minus').width() / 50
              , pos_l = Math.ceil($('#sensor3 .minus').width() - (pos_w / 2) + parseFloat(data.value) * deg_w)
              , val_l = Math.ceil($('#sensor3 .minus').width() - (val_w / 2) + parseFloat(data.value) * deg_w);
            console.log('Sensor3', '-', $('#sensor3 .minus').width(), '+', $('#sensor3 .plus').width(), $('#sensor3 .value').width(), 'pos_w', pos_w, 'val_w', val_w, 'deg_w', deg_w, 'pos_l', pos_l, 'val_l', val_l);
            $('#sensor3 .pos').css({left: pos_l + 'px'});
            $('#sensor3 .val').css({left: val_l + 'px'});
        }).on('error', function() {
            $('<div class="error">Error while trying to update record in DB</div>').appendTo($('#messages'));
            setTimeout('$(".error").remove();', 3000);
        }).on('success', function() {
            $('<div class="success">DB record updated successfully</div>').appendTo($('#messages'));
            setTimeout('$(".success").remove();', 3000);
        });
    });
    window.change = function(obj) {
        window[$(obj).attr('class')].emit('update', {name: $(obj).prev().attr('name'), value: $(obj).prev().val()});
    }
});
