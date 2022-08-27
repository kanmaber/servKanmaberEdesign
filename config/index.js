module.exports={
    port:process.env.PORT,
    local_client_app:process.env.LOCAL_CLIENT_APP,
    remote_client_app:process.env.REMOTE_CLIENT_APP,
    local_server_api:process.env.LOCAL_SERVER_API,
    remote_server_api:process.env.REMOTE_SERVER_API,
    allowedDomains:process.env.MODE_ENV==='production' ? [
            process.env.REMOTE_CLIENT_APP,
            process.env.REMOTE_SERVER_API
        ]:
            [process.env.LOCAL_CLIENT_APP,
            process.env.LOCAL_SERVER_API
        ]
}