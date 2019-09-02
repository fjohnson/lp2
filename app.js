/*
    Let's Program #2
    Create a DNS client 
                            */

const argv = require('yargs')
                    .default('t','ANY') 
                    .default('s',['8.8.8.8', //cloud flare dns
                                  '208.67.222.222', //cisco open dns
                                  '208.67.220.220', //cisco open dns
                                  '1.1.1.1' //google dns  
                                ])
                    .array('s')
                    .describe('r', 'reverse ipv4 address')
                    .describe('h', "hostname")
                    .describe('r', "record type")
                    .describe('s','list of dns servers')
                    .argv;


const { Resolver } = require('dns').promises;
const resolver = new Resolver();
resolver.setServers(argv.s);

resolver.resolve(argv.r ? reverseIp(argv.h): argv.h, argv.t.toUpperCase()).then((value) => {
    console.log(value);
})
.catch((e) => {console.log(e);});

function reverseIp(ipAddr){
    reversedIp = [];
    ipAddrN = ipAddr.split('.');
    while(ipAddrN.length){
        reversedIp.push(ipAddrN.pop());
    } 
    return reversedIp.join('.')+'.in-addr.arpa';
}
