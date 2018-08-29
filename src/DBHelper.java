import java.sql.*;
import java.util.*;

public class DBHelper implements java.io.Serializable {
    private static String connectionURL = "jdbc:mysql://opatija:3306/jadrn020?user=jadrn020&password=desktop";
    private static Connection connection = null;
    private static Statement statement = null;
    private static ResultSet resultSet = null;

    public DBHelper() {
    }

    public static String doQuery(String s) {
        String answer = "";
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            connection = DriverManager.getConnection(connectionURL);
            statement = connection.createStatement();
            resultSet = statement.executeQuery(s);
            ResultSetMetaData rsmd = resultSet.getMetaData();

            while (resultSet.next()) {
                int columns = rsmd.getColumnCount();

                for (int i = 1; i <= columns; i++) {

                    if (i % 10 == 0) {
                        answer += resultSet.getString(rsmd.getColumnName(i)) + ";";
                    } else {

                        answer += resultSet.getString(rsmd.getColumnName(i)) + "|";
                    }

                }

            }
        } catch (Exception e) {
            e.printStackTrace();
            return e.toString();
        }
        //////////////////////////////////////////////////////////////////////////
        // The finally clause always runs, and closes resources if open.
        // DO NOT OMIT THIS!!!!!!
        finally {
            try {
                if (resultSet != null)
                    resultSet.close();
                if (statement != null)
                    statement.close();
                if (connection != null)
                    connection.close();
            } catch (SQLException e) {
                answer += e;
            }
            //////////////////////////////////////////////////////////////////////////
        }
        return answer;
    }


    public static String doQueryForQuantity(String s) {
        String answer = "";
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            connection = DriverManager.getConnection(connectionURL);
            statement = connection.createStatement();
            resultSet = statement.executeQuery(s);
            ResultSetMetaData rsmd = resultSet.getMetaData();

            while (resultSet.next()) {
                int columns = rsmd.getColumnCount();

                for (int i = 1; i <= columns; i++) {

                    if (i % 10 == 0) {
                        answer += resultSet.getString(rsmd.getColumnName(i)) + ";";
                    } else {

                        answer += resultSet.getString(rsmd.getColumnName(i));
                    }

                }

            }
        } catch (Exception e) {
            e.printStackTrace();
            return e.toString();
        }
        //////////////////////////////////////////////////////////////////////////
        // The finally clause always runs, and closes resources if open.
        // DO NOT OMIT THIS!!!!!!
        finally {
            try {
                if (resultSet != null)
                    resultSet.close();
                if (statement != null)
                    statement.close();
                if (connection != null)
                    connection.close();
            } catch (SQLException e) {
                answer += e;
            }
            //////////////////////////////////////////////////////////////////////////
        }
        return answer;
    }

    public static int doUpdateQuery(String s) {

        int resultSet = 0;
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            connection = DriverManager.getConnection(connectionURL);
            statement = connection.createStatement();
            resultSet = statement.executeUpdate(s);

        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
        //////////////////////////////////////////////////////////////////////////
        // The finally clause always runs, and closes resources if open.
        // DO NOT OMIT THIS!!!!!!
        finally {
            try {
                if (statement != null)
                    statement.close();
                if (connection != null)
                    connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            //////////////////////////////////////////////////////////////////////////
        }
        return resultSet;
    }
}

