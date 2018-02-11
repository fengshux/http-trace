"use strict";

const uuidv4 = require('uuid/v4');

class Span {
    
    constructor( header ) {
        if( !header ) {
            this.id = uuidv4();
            this.cs = null;
            this.sr = null;
            this.ss = null;
            this.cr = null;
        } else {
            this.id = header['trace-span-id'];
            this.cs = header['trace-span-cs'];
            this.sr = header['trace-span-sr'];
            this.ss = header['trace-span-ss'];
            this.cr = header['trace-span-cr'];
        }
    }

    static getSpan( header ) {
        
        return new Span(header);
    }

    clientSend() {
        this.cs = Date.now();
    }

    serverReceive() {
        this.sr = Date.now();
    }

    serverSend() {
        this.ss = Date.now();
    }

    clientReceive() {
        this.cr = Date.now();
    }
    
}


class HttpTrace {
    
    constructor( traceid ) {
        this.id = traceid || uuidv4();
        this.timestamp = Date.now();
        this.span = new Span();
    }

    static getTrace( header ) {
        let trace = new HttpTrace( header['trace-id'] );
        trace.span = Span.getSpan( header );
        return trace;
    }
}



module.exports = HttpTrace;
