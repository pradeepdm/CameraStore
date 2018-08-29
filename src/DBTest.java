import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;



public class DBTest extends HttpServlet {


    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
            throws IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<html>");
        out.println("<body>");
        out.println("<h1>A database query using the DBHelper class</h1>");
        out.println("Results from database query:<br />");
        out.println(DBHelper.doQuery("SELECT sku, vendorModel, description, retail FROM product;"));
        out.println("</body>");
        out.println("</html>");

    }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response)
            throws IOException {
        doGet(request, response);
    }
}


