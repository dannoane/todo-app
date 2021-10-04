package com.dannoane.todoapi.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongoDBConnectionConfig extends AbstractMongoClientConfiguration {
    @Value("${dbuser:}")
    private String user;

    @Value("${dbpassword:}")
    private String password;

    @Value("${dbhost:localhost}")
    private String host;

    @Value("${dbport:27017}")
    private int port;

    @Value("${dbname:test}")
    private String dbName;

    @Override
    protected String getDatabaseName() {
        return dbName;
    }

    @Override
    protected void configureClientSettings(MongoClientSettings.Builder builder) {
        String conn;
        if (user.equals("")) {
            conn = String.format("mongodb://%s:%d/%s?readPreference=primary&ssl=false", host, port, dbName);
        } else {
            conn = String.format("mongodb+srv://%s:%s@%s/%s?retryWrites=true&w=majority", user, password, host, dbName);
        }

        ConnectionString connectionString = new ConnectionString(conn);
        builder.applyConnectionString(connectionString);
    }
}
