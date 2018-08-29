import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class DisplayDB extends HttpServlet {
    private String[] rawCookieNameAndValuePair;

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
            throws IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String param1 = request.getParameter("queryInput");
        String result = DBHelper.doQuery(param1);
        out.print(result);

    }
}